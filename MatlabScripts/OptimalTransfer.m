function [tab, Ac, Bc, T] = OptimalTransfer(bill,names)
%OptimalTransfer Compute the optimal (L1 norm) transfer between people
%   [Ac, Bc, T] = OptimalTransfer(bill,names)

assert(length(bill) == length(names));

N = length(bill);

P = bill(:);

if sum(P) ~= 0
    if abs(sum(P)) < 0.02
        P_end = -sum(P(1:end-1));
        warning("OptimalTransfer:Unbalanced bill under $0.02\n Treating as rounding error, keep going.\n" + ...
            "Chaning the debt of last person from %f to %f",P(end),P_end);
        
        P = [P(1:end-1); P_end];
        assert(sum(P) == 0, 'OptimalTransfer:Balance failed!!!');
    else
        error('OptimalTransfer:Unbalanced bill!!!');
    end
end

% Generate all conbinations (a, b) s.t. a < b using lower triangular matrix
[Bc, Ac] = find(tril(ones(N, N), -1));
n_c = N*(N-1)/2;

% 
S = zeros(N, n_c);
for i = 1:N
    % For each i, use logic index to fill S matrix
    S(i, Ac == i) = 1;   % (i, k), so set s to 1
    S(i, Bc == i) = -1;  % (k, i), so set s to -1
end


f = [zeros(n_c,1); ones(n_c,1)];
I = eye(n_c);
Aeq = [S zeros(N, n_c)];

% Solve L1 norm optimal via LP
A = [I -I; -I -I];
b = zeros(2*n_c,1);

x = linprog(f,A,b,Aeq,P);
T = x(1:n_c);


if false
    % Solve L0 norm optimal via MILP
    M = sum(abs(P));
    intcon = n_c+1:2*n_c;
    A = [I -M*I; -I -M*I];
    b = zeros(2*n_c,1);
    lb = [-inf(n_c,1); zeros(n_c,1)];
    ub = [ inf(n_c,1);  ones(n_c,1)];
    x0 = [T;T~=0];
    options = optimoptions('intlinprog','Display','off');
    
    x = intlinprog(f,intcon, A,b,Aeq,P,lb,ub,x0,options);
    T = x(1:n_c);
end

From = {};
To = {};
Amount = [];
for i = find(T~=0).'
    if abs(T(i)) < 0.05
%         fprintf("A small transfer, skip\n");
        continue
    end
    if T(i) >= 0
        From{end+1} = names(Ac(i));
        To{end+1} = names(Bc(i));
        Amount(end+1) = T(i);

%         fprintf("%s transfer to %s : %.2f\n", names(Ac(i)), names(Bc(i)), T(i));
    else
        From{end+1} = names(Bc(i));
        To{end+1} = names(Ac(i));
        Amount(end+1) = -T(i);
%         fprintf("%s transfer to %s : %.2f\n", names(Bc(i)), names(Ac(i)), -T(i));
    end
    
end
From = string(From).';
To = string(To).';
Amount = Amount.';
tab = table(From,To,Amount);

end
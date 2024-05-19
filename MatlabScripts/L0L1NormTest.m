N = 100;
sp = 1;

L0s = zeros(5,sp);
L1s = zeros(5,sp);

for j = 1:sp

    p = 10*rand([N-1,1])-5;
    p = round(p);
    P = [p;-sum(p)];
    assert(sum(P) == 0, 'Unbalanced bill!!!')
    
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
    
    
    %% Solve L1 norm optimal via LP
    f = [zeros(n_c,1); ones(n_c,1)];
    I = eye(n_c);
    A = [I -I; -I -I];
    b = zeros(2*n_c,1);
    Aeq = [S zeros(N, n_c)];
    
    x = linprog(f,A,b,Aeq,P);
    T = x(1:n_c);
    L0_LP = sum(T~=0); % L0 norm
    L1_LP = sum(abs(T)); % L1 norm

    T_l1 = T;
    
    %% Solve L0 norm optimal via MILP
    % Compute big M
    M = sum(abs(P));
    intcon = n_c+1:2*n_c;
    A = [I -M*I; -I -M*I];
    b = zeros(2*n_c,1);
    lb = [-inf(n_c,1); zeros(n_c,1)];
    ub = [ inf(n_c,1);  ones(n_c,1)];
    options = optimoptions('intlinprog','Display','iter');
    
    % /Library/gurobi1001/macos_universal2/examples/matlab/intlinprog.m
    % No init
    if 1
        x = intlinprog(f,intcon, A,b,Aeq,P,lb,ub,[],options);
        T = round(x(1:n_c));
        L0_noinit = sum(T~=0); % L0 norm
        L1_noinit = sum(abs(T)); % L1 norm
    else
        L0_noinit = nan; % L0 norm
        L1_noinit = nan; % L1 norm
    end
    
    % Relaxed LP
    x = linprog(f, A,b,Aeq,P,lb,ub);
    T = round(x(1:n_c));
    L0_relax = sum(T~=0); % L0 norm
    L1_relax = sum(abs(T)); % L1 norm

    T_relax = T;

    % L1 optimal as init
    if 0
        x0 = [T_l1;T_l1~=0];
        x = intlinprog(f,intcon, A,b,Aeq,P,lb,ub,x0,options);
        T = round(x(1:n_c));
        L0_L1init = sum(T~=0); % L0 norm
        L1_L1init = sum(abs(T)); % L1 norm
    else
        L0_L1init = nan; % L0 norm
        L1_L1init = nan; % L1 norm
    end

    % Relaxed as init 
    if 0
        x0 = [T_relax;T_relax~=0];
        x = intlinprog(f,intcon, A,b,Aeq,P,lb,ub,x0,options);
        T = round(x(1:n_c));
        L0_relaxinit = sum(T~=0); % L0 norm
        L1_relaxinit = sum(abs(T)); % L1 norm
    else
        L0_relaxinit = nan; % L0 norm
        L1_relaxinit = nan; % L1 norm
    end

    L0s(:,j) = [L0_LP; L0_relax; L0_noinit; L0_L1init; L0_relaxinit];
    L1s(:,j) = [L1_LP; L1_relax; L1_noinit; L1_L1init; L1_relaxinit];

end
%% 

tiledlayout(2,1)
nexttile
hold on
title('L0 norm');
stem(1:sp, L0s(1,:),'^','MarkerSize',12);
stem(1:sp, L0s(2,:),'v','MarkerSize',12);
stem(1:sp, L0s(3,:),'o','MarkerSize',12);
stem(1:sp, L0s(4,:),'x','MarkerSize',12);
stem(1:sp, L0s(5,:),'+','MarkerSize',12);
legend('LP','Relaxed MILP','MILP No Init','MILP LP Init','MILP Relax Init')


nexttile
hold on
title('L1 norm');
stem(1:sp, L1s(1,:),'^','MarkerSize',12);
stem(1:sp, L1s(2,:),'v','MarkerSize',12);
stem(1:sp, L1s(3,:),'o','MarkerSize',12);
stem(1:sp, L1s(4,:),'x','MarkerSize',12);
stem(1:sp, L1s(5,:),'+','MarkerSize',12);
legend('LP','Relaxed MILP','MILP No Init','MILP LP Init','MILP Relax Init')
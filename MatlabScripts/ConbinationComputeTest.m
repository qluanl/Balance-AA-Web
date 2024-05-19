Ns = 3:100;
% Ns = 3:5;
N = length(Ns);
sp = 1000;

time_nck = zeros(N,sp);
time_mat = zeros(N,sp);

for i = 1:N
    n = Ns(i);
    for j = 1:sp
        tic
        % Methods with nchoosek
%         combinations = nchoosek(1:n, 2);
        d1 = nchoosek(n, 2);
        time_nck(i,j) = toc;
        tic
        % Methods with customization
%         [B, A] = find(tril(ones(n, n), -1));
        d2 = n*(n-1)/2;
        time_mat(i,j) = toc;
    end
    

end

figure(234);
clf
hold on
varplot(Ns, time_nck,'DisplayName','nchoosek');
varplot(Ns, time_mat,'DisplayName','Matrix trick');
legend
xlabel("Number of objects");
ylabel("Computation time");

const funcionarios = [];
const prompt = require("prompt-sync")();

function adicionarFuncionario(id, nome, cargo, taxaHoraria) {
    const funcionario = {
        id: id,
        nome: nome,
        cargo: cargo,
        taxaHoraria: taxaHoraria,
        horasTrabalhadas: [] 
    };
    funcionarios.push(funcionario);
}

function registrarHoras(id, horas) {
 
    const funcionario = funcionarios.find(func => func.id === id);

    if (funcionario) {
        funcionario.horasTrabalhadas.push(horas);
    } else {
        console.log(`Funcionário com ID ${id} não encontrado.`);
    }
}

function calcularSalarioMensal(id) {
    
    const funcionario = funcionarios.find(func => func.id === id);

    if (funcionario) {
        // Soma todas as horas trabalhadas
        const totalHoras = funcionario.horasTrabalhadas.reduce((total, horas) => total + horas, 0);

        // Calcula o salário total
        const salarioTotal = totalHoras * funcionario.taxaHoraria;

        return salarioTotal;
    } else {
        console.log(`Funcionário com ID ${id} não encontrado.`);
        return null;
    }
}


function calcularInss(salarioBruto) {
    let inss = 0;

    if (salarioBruto <= 1412.00) {
        inss = salarioBruto * 0.075; // 7.5%
    } else if (salarioBruto <= 2666.68) {
        inss = salarioBruto * 0.09; // 9%
    } else if (salarioBruto <= 4000.03) {
        inss = salarioBruto * 0.12; // 12%
    } else if (salarioBruto <= 7786.02) {
        inss = salarioBruto * 0.14; // 14%
    } else {
        inss = 908.85; // Teto do INSS
    }

    return inss;
}


function gerarRelatorioPagamento() {
    console.log("Relatório de Pagamento:");
    console.log("========================");

    funcionarios.forEach(funcionario => {
        const totalHoras = funcionario.horasTrabalhadas.reduce((total, horas) => total + horas, 0); // Soma total de horas
        const salarioBruto = calcularSalarioMensal(funcionario.id); // Calcula o salário bruto
        const valorInss = calcularInss(salarioBruto); // Calcula o valor do INSS
        const salarioLiquido = salarioBruto - valorInss; // Calcula o salário líquido

        console.log(`
        Nome: ${funcionario.nome}
        Cargo: ${funcionario.cargo}
        Total de horas trabalhadas: ${totalHoras}
        Salário Bruto: R$ ${salarioBruto.toFixed(2)}
        Valor do INSS: R$ ${valorInss.toFixed(2)}
        Salário Líquido: R$ ${salarioLiquido.toFixed(2)}
        `);
        console.log("========================");
    });
}

// Função para exibir o menu principal do sistema
function gerenciarFolhaPagamento() {
    let continuar = true;

    while (continuar) {
        console.log(`
        ===============================
        Sistema de Folha de Pagamento
        ===============================
        Escolha uma opção:
        1. Adicionar funcionário
        2. Registrar horas trabalhadas
        3. Exibir relatório de pagamento
        4. Sair
        ===============================
        `);

        const escolha = prompt("Digite o número da opção desejada: ");

        switch (escolha) {
            case "1":
                // Adicionar funcionário
                const id = parseInt(prompt("Digite o ID do funcionário: "));
                const nome = prompt("Digite o nome do funcionário: ");
                const cargo = prompt("Digite o cargo do funcionário: ");
                const taxaHoraria = parseFloat(prompt("Digite a taxa horária (R$): "));
                adicionarFuncionario(id, nome, cargo, taxaHoraria);
                console.log("Funcionário adicionado com sucesso!");
                break;

            case "2":
                // Registrar horas trabalhadas
                const idHoras = parseInt(prompt("Digite o ID do funcionário: "));
                const horas = parseFloat(prompt("Digite a quantidade de horas trabalhadas: "));
                registrarHoras(idHoras, horas);
                console.log("Horas registradas com sucesso!");
                break;

            case "3":
                // Exibir relatório de pagamento
                gerarRelatorioPagamento();
                break;

            case "4":
                // Sair
                console.log("Encerrando o sistema. Até logo!");
                continuar = false;
                break;

            default:
                console.log("Opção inválida. Tente novamente.");
        }
    }
}

// Chamando a função para iniciar o sistema
gerenciarFolhaPagamento();

// Testando o relatório de pagamento
// gerarRelatorioPagamento();

import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Perfil from "./Perfil";

// Mock Sidebar
vi.mock("../components/Sidebar", () => ({
    default: () => <div data-testid="sidebar-mock">SidebarMock</div>,
}));

describe("Perfil Page", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    // Teste 1 — Renderização geral
    it("renderiza os elementos principais", () => {
        const { container } = render(
            <MemoryRouter>
                <Perfil />
            </MemoryRouter>
        );

        expect(screen.getByTestId("sidebar-mock")).toBeInTheDocument();
        expect(screen.getByText("Meu Perfil")).toBeInTheDocument();

        // inputs via posição (não há htmlFor)
        const inputs = container.querySelectorAll("input");

        expect(inputs.length).toBeGreaterThan(0);

        // Nome
        expect(inputs[0]).toHaveAttribute("type", "text");

        // Email
        expect(inputs[1]).toHaveAttribute("type", "email");

        // Data
        expect(inputs[2]).toHaveAttribute("type", "date");

        // CPF desabilitado
        expect(inputs[3]).toBeDisabled();
    });

    // Teste 2 — Alteração dos campos
    it("permite editar nome, email e data de nascimento", () => {
        const { container } = render(
            <MemoryRouter>
                <Perfil />
            </MemoryRouter>
        );

        const inputs = container.querySelectorAll("input");

        const nome = inputs[0];
        fireEvent.change(nome, { target: { value: "Carol" } });
        expect(nome.value).toBe("Carol");

        const email = inputs[1];
        fireEvent.change(email, { target: { value: "carol@gmail.com" } });
        expect(email.value).toBe("carol@gmail.com");

        const data = inputs[2];
        fireEvent.change(data, { target: { value: "2001-04-17" } });
        expect(data.value).toBe("2001-04-17");
    });

    // Teste 3 — Notificação ao salvar
    it("mostra notificação de sucesso ao salvar", () => {
        render(
            <MemoryRouter>
                <Perfil />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: "Salvar Alterações" }));

        expect(
            screen.getByText("Alterações salvas com sucesso!")
        ).toBeInTheDocument();
    });

    // Teste 4 — Abrir e fechar modal
    it("abre e fecha o modal de alterar senha", () => {
        const { queryByText } = render(
            <MemoryRouter>
                <Perfil />
            </MemoryRouter>
        );

        // Abre modal clicando no botão "Alterar Senha" do formulário
        fireEvent.click(screen.getByRole("button", { name: "Alterar Senha" }));

        // Modal aberto: campo "Senha atual" visível
        expect(screen.getByText("Senha atual")).toBeInTheDocument();

        // Fecha modal clicando em "Cancelar"
        const cancelar = screen.getByRole("button", { name: "Cancelar" });
        fireEvent.click(cancelar);

        // Modal fechado: "Senha atual" não deve mais estar na tela
        expect(queryByText("Senha atual")).not.toBeInTheDocument();
    });


    // Teste 5 — Campos vazios
    it("mostra erro quando tenta confirmar senha com campos vazios", () => {
        render(
            <MemoryRouter>
                <Perfil />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: "Alterar Senha" }));
        fireEvent.click(screen.getByRole("button", { name: "Salvar" }));

        expect(
            screen.getByText("Por favor, preencha todos os campos.")
        ).toBeInTheDocument();
    });

    // Teste 6 — Senhas diferentes
    it("mostra erro quando as senhas não coincidem", () => {
        const { container } = render(
            <MemoryRouter>
                <Perfil />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: "Alterar Senha" }));

        const modalInputs = container.querySelectorAll("input[type='password']");

        fireEvent.change(modalInputs[0], { target: { value: "123" } });
        fireEvent.change(modalInputs[1], { target: { value: "abc" } });
        fireEvent.change(modalInputs[2], { target: { value: "xyz" } });

        fireEvent.click(screen.getByRole("button", { name: "Salvar" }));

        expect(screen.getByText("As senhas não coincidem.")).toBeInTheDocument();
    });

    // Teste 7 — Alteração de senha bem-sucedida
    it("altera senha com sucesso", () => {
        const { container } = render(
            <MemoryRouter>
                <Perfil />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: "Alterar Senha" }));

        const modalInputs = container.querySelectorAll("input[type='password']");

        fireEvent.change(modalInputs[0], { target: { value: "123" } });
        fireEvent.change(modalInputs[1], { target: { value: "abc" } });
        fireEvent.change(modalInputs[2], { target: { value: "abc" } });

        fireEvent.click(screen.getByRole("button", { name: "Salvar" }));

        expect(
            screen.getByText("Senha alterada com sucesso!")
        ).toBeInTheDocument();
    });

    // Teste 8 — Role salva no localStorage
    it("salva a role no localStorage", () => {
        render(
            <MemoryRouter>
                <Perfil />
            </MemoryRouter>
        );

        const select = screen.getByLabelText("Função:");

        fireEvent.change(select, { target: { value: "Administrador" } });

        expect(localStorage.getItem("userRole")).toBe("Administrador");
    });
});

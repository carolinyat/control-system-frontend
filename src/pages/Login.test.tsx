import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

// mock global do navigate
const mockedNavigate = vi.fn();

// sobrescreve somente useNavigate, mantendo resto das rotas
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>(
        "react-router-dom"
    );

    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe("Login Page", () => {
    beforeEach(() => {
        mockedNavigate.mockClear();
    });

    // Teste 1 — Verifica renderização inicial
    // Garante que os textos principais aparecem na tela.
    it("renderiza o título corretamente", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByText("Pro-Nuncia")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
    });

    // Teste 2 — Ação de login
    // Simula o clique no botão “Entrar” e verifica se navega para /dashboard.
    it("navega para /dashboard ao fazer login", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const button = screen.getByRole("button", { name: /entrar/i });
        fireEvent.click(button);

        expect(mockedNavigate).toHaveBeenCalledWith("/dashboard");
    });

    // Teste 3 — Esqueceu a senha
    // Clica no link e confirma que navega para /reset-password.
    it("navega para /reset-password ao clicar em Esqueceu sua senha", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const forgotLink = screen.getByText(/esqueceu sua senha/i);
        fireEvent.click(forgotLink);

        expect(mockedNavigate).toHaveBeenCalledWith("/reset-password");
    });
});

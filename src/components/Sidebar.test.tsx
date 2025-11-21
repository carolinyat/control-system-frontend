import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Sidebar from "./Sidebar";

// Mock do useNavigate
const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>(
        "react-router-dom"
    );
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

// Limpa mocks antes de cada teste
beforeEach(() => {
    mockedNavigate.mockClear();
    localStorage.clear();
});

describe("Sidebar Component", () => {
    it("renderiza os itens básicos da sidebar", () => {
        localStorage.setItem("userRole", "Cliente");

        render(
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        );

        expect(screen.getByText("Pro-Nuncia")).toBeInTheDocument();
        expect(screen.getByText("Ferramenta de análise de pronúncia")).toBeInTheDocument();

        // Links básicos
        expect(screen.getByText("Início")).toBeInTheDocument();
        expect(screen.getByText("Evolução")).toBeInTheDocument();
        expect(screen.getByText("Relatório")).toBeInTheDocument();
        expect(screen.getByText("Perfil")).toBeInTheDocument();

        // Cliente não vê "Usuários"
        expect(screen.queryByText("Usuários")).not.toBeInTheDocument();
    });

    it("exibe o link 'Usuários' quando o usuário é Administrador", () => {
        localStorage.setItem("userRole", "Administrador");

        render(
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        );

        expect(screen.getByText("Usuários")).toBeInTheDocument();
    });

    it("não exibe o link 'Usuários' para Cliente", () => {
        localStorage.setItem("userRole", "Cliente");

        render(
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        );

        expect(screen.queryByText("Usuários")).not.toBeInTheDocument();
    });

    it("realiza logout ao clicar no botão 'Sair'", () => {
        localStorage.setItem("userRole", "Cliente");

        render(
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        );

        const sairButton = screen.getByRole("button", { name: /sair/i });
        fireEvent.click(sairButton);

        // remove role
        expect(localStorage.getItem("userRole")).toBeNull();

        // navega para login
        expect(mockedNavigate).toHaveBeenCalledWith("/");
    });
});

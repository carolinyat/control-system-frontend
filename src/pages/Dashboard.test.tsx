import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

// mock global do navigate
const mockedNavigate = vi.fn();

// mock de react-router-dom com navigate
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>(
        "react-router-dom"
    );

    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

// mock leve dos componentes Sidebar e ScoreBox
vi.mock("../components/Sidebar", () => ({
    default: () => <div data-testid="sidebar-mock">SidebarMock</div>,
}));

vi.mock("../components/ScoreBox", () => ({
    default: () => <div data-testid="scorebox-mock">ScoreBoxMock</div>,
}));

describe("Dashboard Page", () => {
    beforeEach(() => {
        mockedNavigate.mockClear();
    });

    //  Teste 1 – Renderização geral
    it("renderiza título e componentes principais", () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );

        // Título
        expect(screen.getByText("Pronúncia")).toBeInTheDocument();

        // Componentes mockados
        expect(screen.getByTestId("sidebar-mock")).toBeInTheDocument();
        expect(screen.getByTestId("scorebox-mock")).toBeInTheDocument();
    });

    // Teste 2 – Renderiza todas as fases
    it("renderiza seis botões de fases numeradas", () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );

        for (let i = 1; i <= 6; i++) {
            expect(screen.getByText(`Fase ${i}`)).toBeInTheDocument();
        }
    });

    // Teste 3 – Clique na fase navega corretamente
    it("navega para a fase correta ao clicar em um botão", () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );

        const fase3Btn = screen.getByText("Fase 3");
        fireEvent.click(fase3Btn);

        expect(mockedNavigate).toHaveBeenCalledWith("/pronuncia?fase=3");
    });

    // Teste 4 – Verifica última fase também
    it("navega para /pronuncia?fase=6 ao clicar na fase 6", () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );

        const fase6Btn = screen.getByText("Fase 6");
        fireEvent.click(fase6Btn);

        expect(mockedNavigate).toHaveBeenCalledWith("/pronuncia?fase=6");
    });
});

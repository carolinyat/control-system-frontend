import { render, screen, fireEvent } from "@testing-library/react";
import MicButton from "./MicButton";

describe("MicButton Component", () => {
    it("renderiza o botão de microfone", () => {
        render(<MicButton />);

        const button = screen.getByRole("button", { name: "Botão de microfone" });
        expect(button).toBeInTheDocument();

        // Ícone renderizado
        expect(button.querySelector("svg")).toBeInTheDocument();
    });

    it("aplica a classe de gravação quando isRecording = true", () => {
        render(<MicButton isRecording={true} />);

        const button = screen.getByRole("button", { name: "Botão de microfone" });

        // Classe CSS "recording" presente
        expect(button.className).toMatch(/recording/);
    });

    it("chama a função onClick ao ser clicado", () => {
        const handleClick = vi.fn();

        render(<MicButton onClick={handleClick} />);

        const button = screen.getByRole("button", { name: "Botão de microfone" });
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});

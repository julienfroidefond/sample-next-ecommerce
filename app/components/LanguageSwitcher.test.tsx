import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { LanguageSwitcher } from "./LanguageSwitcher";

// Mock next/navigation
const refreshMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

afterEach(() => {
  cleanup();
  refreshMock.mockClear();
});

describe("LanguageSwitcher", () => {
  it("affiche les deux boutons de langue", () => {
    render(<LanguageSwitcher currentLang="fr" />);
    expect(screen.getByTestId("lang-switch-fr")).toBeInTheDocument();
    expect(screen.getByTestId("lang-switch-en")).toBeInTheDocument();
  });

  it("met en surbrillance la langue active", () => {
    render(<LanguageSwitcher currentLang="fr" />);
    const frButton = screen.getByTestId("lang-switch-fr");
    expect(frButton.className).toContain("bg-zinc-900");
  });

  it("set le cookie et refresh au clic", () => {
    render(<LanguageSwitcher currentLang="fr" />);
    fireEvent.click(screen.getByTestId("lang-switch-en"));
    expect(document.cookie).toContain("NEXT_LOCALE=en");
    expect(refreshMock).toHaveBeenCalled();
  });
});

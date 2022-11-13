import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SummaryForm from "../SummaryForm";

describe('SummaryForm', () => { 
    test('Condiciones Iniciales', () => { 
        render(<SummaryForm />);
        
        const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i, });
        expect(checkbox).not.toBeChecked();

        const confirmButton = screen.getByRole('button', { name: /confirm order/i });
        expect(confirmButton).toBeDisabled();
    });
    test('Checkbox habilita el botón en el primer clic y lo desabilita en el segundo clic', async () => { 
        const user = userEvent.setup();

        render(<SummaryForm />);

        const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i, });
        const confirmButton = screen.getByRole('button', { name: /confirm order/i });

        await user.click(checkbox);
        expect(confirmButton).toBeEnabled();

        await user.click(checkbox);
        expect(confirmButton).toBeDisabled();
     });
     test('Popov responde al hover', async () => { 
        const user = userEvent.setup();
        render(<SummaryForm />);

        // Estado inicial del popov
        const nullPopover = screen.queryByText(
            /no ice cream will actually be delivered/i
        );
        expect(nullPopover).not.toBeInTheDocument();

        // Popov aparece cuando se hace hover con el mouse en el checkbox
        const termsAndConditions = screen.getByText(/terms and conditions/i);
        await user.hover(termsAndConditions);
        const popover = screen.getByText(
            /no ice cream will actually be delivered/i
        );
        expect(popover).toBeInTheDocument();

        // Popov desaparece cuando se quita el hover del checkbox
        await user.unhover(termsAndConditions);
        expect(popover).not.toBeInTheDocument();

      })
});
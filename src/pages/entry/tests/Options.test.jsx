import { render, screen } from "@testing-library/react";

import Options from '../Options';

describe('Mock Service', () => { 
    test('Mostrar la imagen por cada opcion de scoop desde el servidor', async () => { 
        render(<Options optionType={'scoops'} />);

        // Encontrar las imagenes
        const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
        expect(scoopImages).toHaveLength(2);

        // confirmando alt text
        // toBe -> numeros, strings etc, toEqual Objetos y arreglos.
        const altText = scoopImages.map((element) => element.alt);
        expect(altText).toEqual(['Chocolate scoop', 'Vainilla scoop']);
    });

    test('Mostrar la imagen por cada opcion de topping desde msw', async () => { 
        render(<Options optionType={'toppings'} />);

        // Encontrar las imagenes
        const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
        expect(toppingImages).toHaveLength(6);

        // confirmando alt text
        // toBe -> numeros, strings etc, toEqual Objetos y arreglos.
        const altText = toppingImages.map((element) => element.alt);
        expect(altText).toEqual([
            "M&Ms topping",
            "Hot fudge topping",
            "Peanut butter cups topping",
            "Gummi bears topping",
            "Mochi topping",
            "Cherries topping",
        ]);
    })
}) 
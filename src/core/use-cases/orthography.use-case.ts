import type { OrthographyResponse } from "../../interfaces";



export const OrthographyUseCase = async(prompt: string) => {

    try {

        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        })

    if (!resp.ok) throw new Error('Error al realizar la corrección de ortografía')

    const data = await resp.json() as OrthographyResponse;

    return {
        ok: true,
        ...data
    }

        
    } catch (error) {
        return {
            ok: false,
            userScore: 0,
            errors: [],
            message: 'No se pudo realizar la corrección de ortografía. Por favor, intenta de nuevo.'
        }
    }


}



export const deleteUSer = async (id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`
    const res = await fetch(url, {
        method: 'DELETE'
    })
    const deleteResolt = await res.json()

    console.log({ deleteResolt })
    return true
}
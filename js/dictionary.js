const wordInput = document.getElementById('wordInput');
    const definitionList = document.getElementById('definitionList');
    
    wordInput.addEventListener('input', fetchDefinitions);
    
async function fetchDefinitions() {
    const word = wordInput.value.trim();
    if (word === '') {
        definitionList.innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        definitionList.innerHTML = data.map(entry => {
            return entry.meanings.map(meaning => {
                return meaning.definitions.map(def => {
                    return `<ol><li><strong>${meaning.partOfSpeech}</strong>: ${def.definition}</li></ol>`;
                }).join('');
            }).join('');
        }).join('');
    } catch (error) {
        console.error('Error fetching data:', error);
        definitionList.innerHTML = '<li>Error fetching data. Please try again later.</li>';
    }
}
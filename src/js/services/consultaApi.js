export const fetchData = async (url, numQueries = 3) => {
    try {
      const data = [];
      
      
    const response = await fetch(`${url}`);
    const result = await response.json();
    data.push(result);
  
      const newData = data[0].results.map((persona) => {
        return {
            cel: persona.cell,
            email: persona.email,            
            name: persona.name.first + " " + persona.name.last,
            picture: persona.picture.large
        };
      });


      return newData;
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error;
    }
  };
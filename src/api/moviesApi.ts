const fetchMovies = async () => {
  let data = null;
  let isLoading = true;
  let error = null;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_MOVIES_API_TOKEN}`
    );
    const dataResponse = await response.json();
    data = dataResponse.results;
    console.log(data);
  } catch (err) {
    error =
      err instanceof Error ? err : new Error("Se produjo un error desconocido");
  } finally {
    isLoading = false;
  }

  return { data, isLoading, error };
};

export default fetchMovies;

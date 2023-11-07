import Header from "../../components/Header";
import github from "../../../src/assets/github.png";
import "./styles.css";
import ItemList from "../../components/IntemList";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [error, setError] = useState(null);

  const handleGetData = async () => {
    try {
      const userData = await fetch(`https://api.github.com/users/${user}`);

      if (userData.status === 404) {
        setError("Usuário não encontrado.");
        setCurrentUser(null);
        setRepos(null);
        return;
      }

      const newUser = await userData.json();

      if (newUser.name) {
        setError(null);

        const { avatar_url, name, bio, public_repos, login } = newUser;
        setCurrentUser({ avatar_url, name, bio, public_repos, login });

        const reposData = await fetch(
          `https://api.github.com/users/${user}/repos`
        );
        const newRepos = await reposData.json();

        if (newRepos.length) {
          setRepos(newRepos);
        }
      }
    } catch (error) {
      setError("Ocorreu um erro ao buscar o usuário.");
      setCurrentUser(null);
      setRepos(null);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={github} className="background hide-on-mobile" alt="github" />
        <div className="info">
          <div>
            <input
              name="usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="@username"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGetData();
                }
              }}
            ></input>
            <button onClick={handleGetData} className="center-on-mobile">Buscar</button>
          </div>
          {error ? (
            <div className="error-message">{error}</div>
          ) : currentUser?.name ? (
            <>
              <div className="perfil">
                <img
                  src={currentUser.avatar_url}
                  className="profile"
                  alt="foto"
                />
                <div>
                  <strong>
                    <h3>{currentUser.name}</h3>
                  </strong>
                  <p>@{currentUser.login}</p>
                  <p>{currentUser.bio}</p>
                  <p>Repositórios públicos: {currentUser.public_repos}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}
          {repos?.length ? (
            <>
              <div>
                <h1 className="repositorio">Repositórios</h1>
                {repos.map((repo) => (
                  <ItemList title={repo.name} link={repo.svn_url} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;

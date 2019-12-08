const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API;

export async function fetchGroupCode() {
  let response = await fetch(`${BACKEND_API_URL}/group_code`);
  return response.json();
}

export async function createGame(code, numPlayers, numQs) {
  let response = await fetch(`${BACKEND_API_URL}/create_game`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code: code,
      numPlayers: numPlayers,
      numQs: numQs
    })
  });
  return response.json();
}

export async function addUser(code, username) {
  let response = await fetch(`${BACKEND_API_URL}/add_user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code: code,
      username: username
    })
  });
  return response.json();
}

export async function getNumPlayers(code) {
  let response = await fetch(`${BACKEND_API_URL}/num_players/${code}`);
  return response.json();
}

export async function getNumPlayersDone(code) {
  console.log(code);
  let response = await fetch(`${BACKEND_API_URL}/num_players_done/${code}`);
  return response.json();
}

export async function getPrompts(solo, numQs, code) {
  let response = await fetch(`${BACKEND_API_URL}/prompts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      solo: solo,
      numQs: numQs ? numQs : undefined,
      code: code ? code : undefined
    })
  });
  return response.json();
}

export async function submitSimilarities(code, username, similarities) {
  console.log(code);
  console.log(username);
  console.log(similarities);
  let response = await fetch(`${BACKEND_API_URL}/similarities`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code: code,
      username: username,
      similarities: similarities
    })
  });
  console.log(response);
  return response.status === 204;
}

export async function getSimilarities(code) {
  let response = await fetch(`${BACKEND_API_URL}/similarities/${code}`);
  return response.json();
}

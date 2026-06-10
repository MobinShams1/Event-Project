import { QueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';


export const queryClient = new QueryClient();

export async function fetchEvents({ signal, searchTerm, max }) {
  console.log(searchTerm);

  let url = `${API_URL}/events`;

  if (searchTerm && max) {
    url += "?search=" + searchTerm + "&max=" + max;
  } else if (searchTerm) {
    url += "?search=" + searchTerm;
  } else if (max) {
    url += "?max=" + max;
  }
  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

// http.js
export async function createNewEvent(eventData) {
  const user = localStorage.getItem("user");
  
  if (!user) {
    const error = new Error("You must be logged in to create an event");
    error.code = 401;
    error.info = { message: "Please login first" };
    throw error;
  }
  
  let headers = {
    "Content-Type": "application/json",
  };

  const userData = JSON.parse(user);
  headers["X-Username"] = userData.username;
  headers["X-UserId"] = userData.id;
  console.log("sending headers: ", headers);

  const response = await fetch(`${API_URL}`, {
    method: "POST",
    body: JSON.stringify({ event: eventData }),
    headers: headers,
  });

  console.log("Response status:", response.status);

  if (!response.ok) {
    const error = new Error("An error occurred while creating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();
  return event;
}

export async function fetchSelectableImages({ signal }) {
  const response = await fetch(`${API_URL}/events/images`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the images");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();
  return images;
}

export async function fetchEvent({ id, signal }) {
  const response = await fetch(`${API_URL}/events/${id}`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function deleteEvent({ id }) {

  const user = localStorage.getItem("user");
  let headers = {};
  if (user) {
    const userData = JSON.parse(user);
    headers["X-Username"] = userData.username;
    headers["X-UserId"] = userData.id;
  }

  const response = await fetch(`${API_URL}/events/${id}`, {
    method: "DELETE",
    headers: headers
  });

  if (!response.ok) {
    const error = new Error("An error occurred while deleting the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export async function updateEvent({ id, event }) {
  const user = localStorage.getItem("user");
  let headers = {
    "Content-Type": "application/json",
  };
  if (user) {
    const userData = JSON.parse(user);
    headers["X-Username"] = userData.username;
    headers["X-UserId"] = userData.id;
  }

  const response = await fetch(`${API_URL}}/events/${id}`, {
    method: "PUT",
    body: JSON.stringify({ event }),
    headers: headers,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while updating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export async function userSignup({ user }) {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while signup user");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export async function userLogin({ user }) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occured while signup user .");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

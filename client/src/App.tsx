import { Component, createEffect, Match, Switch } from "solid-js";
import { io } from "socket.io-client";
import Welcome from "./components/Welcome";
import Game from "./components/Game";
import { roomStore } from "./stores";

const App: Component = () => {
  return (
    <div class=" h-full w-full">
      <Switch>
        <Match when={!roomStore.room()?.roomId}>
          <Welcome />
        </Match>
        <Match when={!!roomStore.room()?.roomId}>
          <Game />
        </Match>
      </Switch>
    </div>
  );
};

export default App;

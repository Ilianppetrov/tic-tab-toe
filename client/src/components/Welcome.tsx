import { createEffect, createSignal, Show } from "solid-js";
import SocketService from "../SocketService";
import { roomStore, nameStore } from "../stores";

export default function Welcome() {
  const [roomId, setRoomId] = createSignal("");
  const [error, setError] = createSignal("");

  function onRoomIdInput(e: InputEvent) {
    setRoomId(e.target?.value);
  }

  return (
    <div class="w-full h-full p-10 flex flex-col items-center bg-purple-400">
      <h1 class="text-7xl text-white font-semibold ">Tic-Tac-Toe</h1>
      <div class=" flex items-center justify-center w-[50%] h-[50%] rounded-lg p-6">
        <div class="flex flex-col gap-4">
          <input
            value={nameStore.name()}
            onInput={(e) => {
              nameStore.setName(e.target.value);
            }}
            placeholder="Name"
            class="rounded-lg text-xl p-2 "
          />
          <button
            disabled={!nameStore.name()}
            onClick={() => {
              SocketService.createRoom(nameStore.name())
                .then((room) => {
                  roomStore.setRoom(room);
                })
                .catch(({ error }) => {
                  setError(error);
                });
            }}
            class=" p-2 text-xl rounded-lg text-purple-400 font-semibold bg-white border-white border-2 enabled:hover:bg-purple-400 enabled:hover:text-white disabled:opacity-60"
          >
            Create
          </button>
          <span class="m-auto text-white">Or</span>
          <input
            value={roomId()}
            oninput={onRoomIdInput}
            maxLength={4}
            placeholder="enter room id"
            class="rounded-lg text-xl p-2 uppercase"
          />
          <button
            onClick={() => {
              SocketService.joinRoom({
                name: nameStore.name(),
                roomId: roomId(),
              })
                .then(roomStore.setRoom)
                .catch(setError);
            }}
            disabled={!nameStore.name() || !roomId()}
            class=" p-2 text-xl rounded-lg text-purple-400 font-semibold bg-white border-white border-2 enabled:hover:bg-purple-400 enabled:hover:text-white disabled:opacity-60"
          >
            Join
          </button>
          <Show when={!!error()}>
            <div class="text-red-800 font-semibold text-center">{error()}</div>
          </Show>
        </div>
      </div>
    </div>
  );
}

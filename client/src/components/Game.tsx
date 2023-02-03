import { Match, Show, Switch } from "solid-js";
import SocketService from "../SocketService";
import { nameStore, roomStore } from "../stores";

export default function Game() {
  SocketService?.onJoin(roomStore.setRoom);
  SocketService.onUpdateBoard(roomStore.setRoom);

  const isDisalbed = () => roomStore.room().playerTurn !== nameStore.name();

  return (
    <div class="w-full h-full p-10 flex flex-col gap-8 items-center bg-purple-400">
      <div class="text-3xl text-white">Room ID: {roomStore.room().roomId}</div>
      <div class="text-3xl text-white">Name: {nameStore.name()}</div>
      <div class="text-3xl text-white">
        Player "{roomStore.room().playerTurn}" turn
      </div>
      <div class="flex justify-around w-full text-white text-2xl">
        <div>
          <div>Player 1</div> <div>{roomStore.room().player1?.name}</div>
        </div>
        <div>
          <div>Player 2</div>
          <div>{roomStore.room().player2?.name || "Waiting ..."}</div>
        </div>
      </div>
      <div>
        <Switch>
          <Match when={roomStore.room().started && !roomStore.room().finished}>
            {roomStore.room().board?.map((row, rowIndex) => {
              return (
                <div class="flex">
                  {row.map((cell, colIndex) => {
                    return (
                      <div
                        onClick={() => {
                          if (isDisalbed()) return;
                          SocketService.updateBoard({ rowIndex, colIndex });
                        }}
                        class={` ${
                          isDisalbed()
                            ? ""
                            : "hover:bg-opacity-40 hover:bg-white"
                        }  w-[13em] border-2 border-white h-[9em] flex items-center justify-center cursor-pointer`}
                      >
                        <div class="text-white text-[70px] capitalize">
                          {cell}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </Match>
          <Match when={roomStore.room().finished}>
            <div class="flex flex-col gap-6">
              <div class="text-white text-4xl font-semibold">
                <Show when={roomStore.room().winner !== "tie"}>
                  The winner is: {roomStore.room().winner}
                </Show>
                <Show when={roomStore.room().winner === "tie"}>
                  Bad luck, it's a tie
                </Show>
              </div>
              <button
                onClick={() => {
                  SocketService.restartGame();
                }}
                class=" p-2 text-xl rounded-lg text-purple-400 font-semibold bg-white border-white border-2 enabled:hover:bg-purple-400 enabled:hover:text-white disabled:opacity-60"
              >
                Restart
              </button>
            </div>
          </Match>
        </Switch>
      </div>
    </div>
  );
}

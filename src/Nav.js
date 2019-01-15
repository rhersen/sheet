import { h } from "hyperapp"

export default ({ getTrains }) => (
  <div id="index">
    <span>
      <a onclick={() => getTrains({ branch: "w", direction: "n" })}>
        Järfälla norrut
      </a>
    </span>
    <span>
      <a onclick={() => getTrains({ branch: "w", direction: "s" })}>
        Järfälla söderut
      </a>
    </span>
    <span>
      <a onclick={() => getTrains({ branch: "n", direction: "n" })}>
        Solna norrut
      </a>
    </span>
    <span>
      <a onclick={() => getTrains({ branch: "n", direction: "s" })}>
        Solna söderut
      </a>
    </span>
    <span>
      <a onclick={() => getTrains({ branch: "c", direction: "n" })}>
        Centralen norrut
      </a>
    </span>
    <span>
      <a onclick={() => getTrains({ branch: "c", direction: "s" })}>
        Centralen söderut
      </a>
    </span>
    <span>
      <a onclick={() => getTrains({ branch: "s", direction: "n" })}>
        Huddinge norrut
      </a>
    </span>
    <span>
      <a onclick={() => getTrains({ branch: "s", direction: "s" })}>
        Huddinge söderut
      </a>
    </span>
    <span>
      <a onclick={() => getTrains({ branch: "e", direction: "n" })}>
        Haninge norrut
      </a>
    </span>
    <span>
      <a onclick={() => getTrains({ branch: "e", direction: "s" })}>
        Haninge söderut
      </a>
    </span>
  </div>
)

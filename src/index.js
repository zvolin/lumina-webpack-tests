import _ from "lodash";
import { Network, NodeConfig } from "lumina-node-wasm";

async function component() {
  const element = document.createElement('div');

  const config = NodeConfig.default(Network.Mainnet);
  const node = await new NodeClient(new URL("./worker.js", import.meta.url));

  const events = await node.events_channel();
  events.onmessage = (event) => {
    console.log(event.data.get("message"));
  };

  await node.start(config);

  const peer_id = await node.local_peer_id();

  element.innerHTML = _.join(['Lumina Node:', '', peer_id], ' ');

  return element;
}

document.body.appendChild(component());

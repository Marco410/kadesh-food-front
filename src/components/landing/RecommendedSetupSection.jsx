import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconPrinter,
  IconCashRegister,
  IconChefHat,
  IconClipboardList,
  IconArrowRight,
} from "@tabler/icons-react";
import { LANDING_SETUP } from "./constants";
import { useMotionConfig } from "./useReducedMotionSafe";

const NODE_ICONS = {
  printer: IconPrinter,
  pos: IconCashRegister,
  kitchen: IconChefHat,
  orders: IconClipboardList,
};

const NODE_LAYOUT = {
  printer: { labelX: "8%", labelY: "48%" },
  pos: { labelX: "34%", labelY: "48%" },
  kitchen: { labelX: "72%", labelY: "14%" },
  orders: { labelX: "72%", labelY: "72%" },
};

const CONNECTION_PATHS = {
  "printer-pos": "M 96 150 H 128",
  "pos-kitchen": "M 168 150 V 72 H 280",
  "pos-orders": "M 168 150 V 228 H 280",
};

function isConnectionActive(connection, activeId) {
  return connection.from === activeId || connection.to === activeId;
}

function SetupNode({ node, isActive, isConnected, onSelect, reduced }) {
  const Icon = NODE_ICONS[node.id];
  const layout = NODE_LAYOUT[node.id];

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(node.id)}
      className="absolute z-10 flex flex-col items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-restro-green rounded-2xl"
      style={{ left: layout.labelX, top: layout.labelY, transform: "translate(-50%, -50%)" }}
      whileHover={reduced ? undefined : { scale: 1.05 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      animate={{
        scale: isActive ? 1.06 : isConnected ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      aria-pressed={isActive}
      aria-label={node.label}
    >
      <div
        className={`relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border-2 transition-colors shadow-sm ${
          isActive
            ? "bg-restro-green text-white border-restro-green shadow-md"
            : isConnected
              ? "bg-white text-restro-green border-restro-green"
              : "bg-white text-gray-700 border-restro-border-green hover:border-restro-green"
        }`}
      >
        <Icon size={32} stroke={1.5} />
        {node.isHub && (
          <span className="absolute -top-2 -right-2 rounded-full bg-restro-green text-white text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wide">
            Hub
          </span>
        )}
        {isActive && (
          <motion.span
            layoutId="setup-node-ring"
            className="absolute inset-0 rounded-2xl ring-4 ring-restro-green/25"
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          />
        )}
      </div>
      <span
        className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${
          isActive ? "text-restro-green" : "text-gray-700"
        }`}
      >
        {node.label}
      </span>
    </motion.button>
  );
}

function ConnectionLine({ pathKey, connection, activeId, reduced }) {
  const active = isConnectionActive(connection, activeId);
  const d = CONNECTION_PATHS[pathKey];

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="#DCE7DB"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {active && (
        <motion.path
          d={d}
          fill="none"
          stroke="#70B56A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 6"
          markerEnd="url(#setup-arrow)"
          initial={false}
          animate={reduced ? {} : { strokeDashoffset: [0, -28] }}
          transition={
            reduced
              ? undefined
              : { repeat: Infinity, duration: 1.1, ease: "linear" }
          }
        />
      )}
      {!active && (
        <path
          d={d}
          fill="none"
          stroke="#C5D4C3"
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd="url(#setup-arrow-muted)"
        />
      )}
    </g>
  );
}

export default function RecommendedSetupSection() {
  const { fadeUp, reduced } = useMotionConfig();
  const [activeId, setActiveId] = useState(LANDING_SETUP.defaultNode);

  const activeNode = LANDING_SETUP.nodes.find((n) => n.id === activeId);
  const activeConnections = useMemo(
    () =>
      LANDING_SETUP.connections.filter((c) => isConnectionActive(c, activeId)),
    [activeId],
  );

  return (
    <section id="configuracion" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="text-restro-green font-semibold text-sm uppercase tracking-wider">
            Hardware
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">
            {LANDING_SETUP.title}
          </h2>
          <p className="mt-4 text-restro-text max-w-2xl mx-auto">
            {LANDING_SETUP.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          <motion.div
            {...fadeUp}
            className="lg:col-span-3 rounded-3xl border border-restro-border-green bg-restro-gray/50 p-4 sm:p-8"
          >
            <div className="relative w-full aspect-[4/3] min-h-[260px]">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 300"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                <defs>
                  <marker
                    id="setup-arrow"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="4"
                    orient="auto"
                  >
                    <path d="M0,0 L8,4 L0,8 Z" fill="#70B56A" />
                  </marker>
                  <marker
                    id="setup-arrow-muted"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="4"
                    orient="auto"
                  >
                    <path d="M0,0 L8,4 L0,8 Z" fill="#C5D4C3" />
                  </marker>
                </defs>

                {LANDING_SETUP.connections.map((connection) => {
                  const pathKey = `${connection.from}-${connection.to}`;
                  return (
                    <ConnectionLine
                      key={pathKey}
                      pathKey={pathKey}
                      connection={connection}
                      activeId={activeId}
                      reduced={reduced}
                    />
                  );
                })}
              </svg>

              {LANDING_SETUP.nodes.map((node) => {
                const isActive = node.id === activeId;
                const isConnected = LANDING_SETUP.connections.some(
                  (c) =>
                    isConnectionActive(c, activeId) &&
                    (c.from === node.id || c.to === node.id),
                );

                return (
                  <SetupNode
                    key={node.id}
                    node={node}
                    isActive={isActive}
                    isConnected={isConnected && !isActive}
                    onSelect={setActiveId}
                    reduced={reduced}
                  />
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {LANDING_SETUP.nodes.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveId(node.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeId === node.id
                      ? "bg-restro-green text-white"
                      : "bg-white text-gray-600 border border-restro-border-green hover:border-restro-green"
                  }`}
                >
                  {node.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={reduced ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-restro-border-green bg-restro-green-light/40 p-6 lg:p-8 h-full"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-restro-green text-white">
                    {React.createElement(NODE_ICONS[activeNode.id], {
                      size: 26,
                      stroke: 1.5,
                    })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {activeNode.label}
                  </h3>
                </div>

                <p className="mt-4 text-gray-700 leading-relaxed">
                  {activeNode.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {activeNode.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-restro-green" />
                      {item}
                    </li>
                  ))}
                </ul>

                {activeConnections.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-restro-border-green/60">
                    <p className="text-xs font-semibold uppercase tracking-wider text-restro-green mb-3">
                      Flujo conectado
                    </p>
                    <ul className="space-y-2">
                      {activeConnections.map((connection) => (
                        <li
                          key={`${connection.from}-${connection.to}`}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <IconArrowRight size={14} className="text-restro-green flex-shrink-0" />
                          <span>
                            {LANDING_SETUP.nodes.find((n) => n.id === connection.from)?.label}
                            {" → "}
                            {LANDING_SETUP.nodes.find((n) => n.id === connection.to)?.label}
                            <span className="text-gray-500"> · {connection.label}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

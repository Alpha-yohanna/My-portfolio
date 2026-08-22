import { liveBuilds } from "../../data/liveBuilds";
import LiveBuildCard from "./LiveBuildCard";

function LiveBuilds() {
  return (
    <section id="work" className="border-t border-white/5 py-28 md:py-36">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-soft">
          Live Builds
        </p>
        <h2 className="mt-4 font-display text-display-md text-ink">
          Real products. Real interfaces.
          <br className="hidden sm:block" /> Built to be experienced.
        </h2>
      </div>

      <div className="divide-y divide-white/5">
        {liveBuilds.map((project, index) => (
          <LiveBuildCard key={project.id} project={project} reverse={index % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

export default LiveBuilds;

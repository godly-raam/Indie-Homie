import { useEffect, useState } from "react";

type MalProfile = {
  avatarUrl: string;
  profileUrl: string;
  username: string;
  daysWatched: number;
  completed: number;
  meanScore: number;
};

const profileUrl = "https://myanimelist.net/profile/GodlyNerd";

export default function MalProfileCard() {
  const [profile, setProfile] = useState<MalProfile | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5_000);

    fetch("https://api.jikan.moe/v4/users/GodlyNerd/full", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Jikan returned ${response.status}`);
        return response.json();
      })
      .then(({ data }) => {
        const anime = data?.statistics?.anime;
        const avatarUrl = data?.images?.jpg?.image_url;

        if (!avatarUrl || !data?.username || !data?.url || !anime) {
          throw new Error("Jikan response is missing profile data");
        }

        setProfile({
          avatarUrl,
          profileUrl: data.url,
          username: data.username,
          daysWatched: anime.days_watched,
          completed: anime.completed,
          meanScore: anime.mean_score,
        });
      })
      .catch(() => {
        // The static profile link below is the intentional failure state.
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, []);

  if (!profile) {
    return (
      <a className="inline text-primary underline [text-decoration-style:dotted] [cursor:alias]" href={profileUrl} target="_blank" rel="noreferrer">
        View my MyAnimeList profile →
      </a>
    );
  }

  return (
    <article className="flex items-center gap-4 mb-4 p-2.5 rounded-[5px] overflow-hidden bg-clr-3">
      <img className="w-16 h-16 rounded-xs object-cover" src={profile.avatarUrl} alt={`${profile.username}'s MyAnimeList avatar`} />
      <div>
        <a className="inline text-primary underline [text-decoration-style:dotted] [cursor:alias]" href={profile.profileUrl} target="_blank" rel="noreferrer">
          {profile.username}
        </a>
        <p className="block mb-0 text-sm">
          {profile.daysWatched} days watched · {profile.completed} completed · {profile.meanScore} mean score
        </p>
      </div>
    </article>
  );
}

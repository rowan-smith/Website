type ProfileContactLinksProps = {
  location: string;
  github: string;
  linkedin: string;
};

export default function ProfileContactLinks({
  location,
  github,
  linkedin,
}: ProfileContactLinksProps) {
  return (
    <>
      <p className="profile-location">{location}</p>
      <div className="profile-links">
        <a href={github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <span className="sep">·</span>
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>VoiceClone Studio</h1>
      <h2>Share Your Voice with the World</h2>
      <div className="about-content">
        <p>
          Welcome to the platform where artists can securely upload their voices
          and share them with the creative community. Transform the way you
          collaborate by making your unique voice accessible to others.
        </p>
        <div className="features">
          <div className="feature-item">
            <h3>For Artists</h3>
            <p>Upload your voice and control who can use it. Reach new audiences and collaborate globally.</p>
          </div>
          <div className="feature-item">
            <h3>For Creators</h3>
            <p>Access a library of authentic voices. Create with permission and bring your projects to life.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

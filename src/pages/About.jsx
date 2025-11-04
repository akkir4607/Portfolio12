import React, { useEffect, useState } from 'react';
import './About.css';
import Navbar from '../components/Navbar';
import Image4 from '../images/4.jpg';
import Image1 from '../images/100.jpeg'
import Image2 from '../images/101.jpeg'
import Image3 from '../images/102.jpeg'
import Image5 from '../images/103.jpeg'
import Image6 from '../images/104.jpeg'
import Image7 from '../images/105.jpeg'
import Image8 from '../images/106.jpeg'
import Image9 from '../images/110.jpeg'
import Image10 from '../images/111.jpeg'
import Image11 from '../images/112.jpeg'
import Image12 from '../images/113.jpeg'
import Image13 from '../images/114.jpeg'
import Image14 from '../images/115.jpeg'
import Image15 from '../images/117.jpeg'
import Image16 from '../images/118.jpeg'
import Image17 from '../images/124.jpg'
import Image18 from '../images/125.jpg'
import Image19 from '../images/126.jpeg'
import Image20 from '../images/107.jpeg'

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Experience data with placeholder images - replace with your actual images
  const experiences = [
    {
      id: 1,
      title: "Organising Hackathon",
      description: "Hackathon Organizer  Global Institute of Technology and Management Led the successful organization of a major hackathon at GITM, demonstrating strong leadership, coordination, and team management skills. Oversaw end-to-end planning, from ideation to execution, engaging participants in innovation, problem-solving, and collaboration while ensuring smooth event management.",
      year: "2024",
      images: [Image1, Image2, Image3, Image4] // Replace with actual images
    },
    {
      id: 2,
      title: "Industry Visit – Honeywell India",
      description: "Engaged in an insightful industry visit to Honeywell India, gaining firsthand exposure to advanced technological solutions and innovation-driven practices. This experience provided a deeper understanding of industrial applications, enriched technical knowledge, and fostered meaningful professional connections for future growth in technology.",
      year: "2024",
      images: [Image6, Image5, Image7, Image8] // Replace with actual images
    },
    {
      id: 3,
      title: "StarkSeek x HackCraft Pre-Hackathon Meet-up",
      description: "Organized by Team Sankalp in collaboration with StarkSeek and supported by Microsoft Azure Community, this meet-up provided tech enthusiasts with expert sessions on UI/UX and DevOps, insights into the StarkSeek community, and an introduction to HackCraft 2.0, fostering learning, networking, and innovation ahead of the main hackathon.",
      year: "2021",
      images: [Image17, Image18, Image19, Image20] // Replace with actual images
    },
    {
      id: 4,
      title: "1st Place – Innoverse’36 Hackathon (SGT University)",
      description: "As part of Team Byte Wizards, secured 1st place at Innoverse’36, a 36-hour national-level hackathon hosted by SGT University. Our project focused on IoT-driven innovation, where we designed and developed a fully functional web and Android application under tight deadlines.",
      year: "2025",
      images: [Image9, Image10] // Replace with actual images
    },
    {
      id: 5,
      title: "Hackathon Organizer – HackCraft 2.0 (GITM)",
      description: "Demonstrated strong leadership by guiding teams, managing events, and driving innovation-focused initiatives. Skilled in decision-making, team coordination, problem-solving, and conflict resolution, with the ability to inspire and motivate peers toward achieving collective goals",
      year: "2025",
      images: [Image15, Image11, Image14, Image13, Image12] // Replace with actual images
    },
    {
      id: 6,
      title: "Virtual Data Analytics Internship – KPMG",
      description: "Completed a virtual internship in Data Analytics at KPMG, gaining hands-on experience with real-world projects and applying analytical skills to derive meaningful insights. Collaborated with industry professionals, enhanced technical expertise, and acquired practical knowledge in data-driven decision-making, preparing for future contributions in analytics and technology.",
      year: "2023",
      images: [Image16] // Replace with actual images
    }

  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const openModal = (experience) => {
    setSelectedExperience(experience);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedExperience) {
      setCurrentImageIndex((prev) => 
        prev === selectedExperience.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedExperience) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedExperience.images.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isModalOpen, selectedExperience]);

  return (
    <>
    <Navbar />
      <section className="about-section">
        <div className="about-container">
          <div className="about-header">
            <span className="kpr-text">HEY</span>
            <h1 className="about-title">
              At the age of 15, Mohit came in touch with coding. Start doing code with HTML and CSS, and gradually advanced to professional skills in DBMS, AI/ML, Python, React, and RUST...
            </h1>
            <div className="compass-icon">
              <div className="compass-star">✦</div>
            </div>
          </div>
          
          
    
          <div className="center-cross">
            <div className="cross-vertical"></div>
            <div className="cross-horizontal"></div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <div className="experience-container">
          <div className="experience-header">
            <span className="experience-subtitle">MY JOURNEY</span>
            <h2 className="experience-title">Experience</h2>
          </div>
          
          <div className="experience-grid">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id}
                className="experience-item"
                onClick={() => openModal(exp)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="experience-number">{exp.id.toString().padStart(2, '0')}</div>
                <div className="experience-content">
                  <h3 className="experience-item-title">{exp.title}</h3>
                  <p className="experience-description">{exp.description}</p>
                  <span className="experience-year">{exp.year}</span>
                </div>
                <div className="experience-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedExperience && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-header">
              <h3 className="modal-title">{selectedExperience.title}</h3>
              <span className="modal-year">{selectedExperience.year}</span>
            </div>
            
            <div className="modal-image-container">
              <button className="modal-nav prev" onClick={prevImage}>‹</button>
              <img 
                src={selectedExperience.images[currentImageIndex]} 
                alt={`${selectedExperience.title} - Image ${currentImageIndex + 1}`}
                className="modal-image"
              />
              <button className="modal-nav next" onClick={nextImage}>›</button>
            </div>
            
            <div className="modal-dots">
              {selectedExperience.images.map((_, index) => (
                <button
                  key={index}
                  className={`modal-dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => goToImage(index)}
                />
              ))}
            </div>
            
            <div className="modal-counter">
              {currentImageIndex + 1} / {selectedExperience.images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
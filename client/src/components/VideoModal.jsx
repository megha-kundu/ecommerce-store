import React, { useRef, useState, useEffect } from 'react';
import { X, Film, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function VideoModal() {
  const { isVideoOpen, setIsVideoOpen } = useStore();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isVideoOpen) {
      setIsPlaying(false);
      setHasStarted(false);
    }
  }, [isVideoOpen]);

  if (!isVideoOpen) return null;

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        }).catch(err => {
          console.log("Video play error:", err);
        });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsVideoOpen(false)}>
      <div 
        className="glass-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '880px',
          padding: 0,
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid var(--border-glow)',
          animation: 'slideUp 0.25s ease-out',
          background: '#090d16'
        }}
      >
        {/* Header bar */}
        <div style={{
          padding: '1rem 1.5rem',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Film size={18} style={{ color: 'var(--accent-cyan)' }} />
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>NEXUS SoundPro X Ultra — Official 4K Product Showcase</span>
          </div>

          <button
            onClick={() => setIsVideoOpen(false)}
            style={{ background: 'none', color: 'var(--text-muted)', display: 'flex' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Player Display */}
        <div style={{
          position: 'relative',
          background: '#000000',
          width: '100%',
          minHeight: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <video
            ref={videoRef}
            controls
            playsInline
            poster="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"
            style={{ width: '100%', maxHeight: '480px', objectFit: 'contain', outline: 'none' }}
            onPlay={() => { setIsPlaying(true); setHasStarted(true); }}
            onPause={() => setIsPlaying(false)}
            onEnded={() => { setIsPlaying(false); setHasStarted(false); }}
          >
            <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4" />
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>

          {/* Big Interactive Central Play/Pause Overlay */}
          {!isPlaying && (
            <button
              onClick={handlePlayClick}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'var(--accent-gradient)',
                color: '#0f172a',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 0 35px rgba(56, 189, 248, 0.7)',
                zIndex: 20
              }}
              title="Click to Play Film"
            >
              <Play size={36} fill="#0f172a" style={{ marginLeft: '4px' }} />
            </button>
          )}
        </div>

        {/* Video Control Bar */}
        <div style={{
          padding: '1rem 1.5rem',
          background: 'rgba(15, 23, 42, 0.95)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handlePlayClick}
              className="btn-primary"
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
              <span>{isPlaying ? 'Pause' : 'Play Film'}</span>
            </button>

            <button
              onClick={toggleMute}
              className="btn-secondary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
            >
              {isMuted ? <VolumeX size={16} style={{ color: 'var(--warning)' }} /> : <Volume2 size={16} style={{ color: 'var(--success)' }} />}
              <span>{isMuted ? 'Unmute' : 'Mute'}</span>
            </button>

            <button
              onClick={handleFullScreen}
              className="btn-secondary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
            >
              <Maximize size={16} />
              <span>Full Screen</span>
            </button>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <span>SoundPro X Ultra • 40mm Titanium Drivers • 40H Battery</span>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = {
  apps: [{
    name: 'elevenlabs-proxy',
    script: 'npm',
    args: 'start',
    cwd: '/root/elevenlabs-proxy-server',
    env: {
      PORT: 8000,
      REACT_APP_AGENT_ID: 'agent_6401k8txgpzaf109x5ymj55fcz9f'
    }
  }]
};

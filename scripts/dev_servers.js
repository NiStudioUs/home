const net = require('net');
const { spawn } = require('child_process');

async function getFreePort(startPort) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    server.on('error', () => {
      resolve(getFreePort(startPort + 1));
    });
  });
}

function runCommand(command, args, cwd) {
  return spawn(command, args, {
    cwd,
    stdio: 'inherit',
    shell: true,
  });
}

async function startServers() {
  console.log('🔍 Scanning for available ports...');
  const profilePort = await getFreePort(5174);
  const learningPort = await getFreePort(5175);

  console.log('\n🚀 Starting Unified Dev Servers (Hot Reload Mode) 🚀');
  console.log(`========================================================`);
  console.log(`👤 Developer Profile Vite Server : http://localhost:${profilePort}`);
  console.log(`📚 Learning Hub Vite Server      : http://localhost:${learningPort}`);
  console.log(`💼 Flutter Portfolio Server      : Dynamic Port`);
  console.log(`========================================================\n`);

  // Start React Profile Server
  runCommand('npm', ['run', 'dev', '--', '--port', profilePort.toString(), '--strictPort'], 'apps/profile');

  // Start React Learning Server
  runCommand('npm', ['run', 'dev', '--', '--port', learningPort.toString(), '--strictPort'], 'apps/learning');

  // Start Flutter App with injected dynamic ports
  runCommand('flutter', [
    'run',
    '-d',
    'chrome',
    `--dart-define=USE_DEV_PORTS=true`,
    `--dart-define=PROFILE_PORT=${profilePort}`,
    `--dart-define=LEARNING_PORT=${learningPort}`
  ], 'apps/portfolio');
}

startServers().catch(console.error);

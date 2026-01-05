/// <reference types="vitest" />

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

const cliPath = path.resolve(__dirname, '..', 'bin', 'create-kiss.js');

const runCli = (cwd, projectName) => {
  const result = spawnSync(process.execPath, [cliPath, projectName], {
    cwd,
    stdio: 'pipe',
    encoding: 'utf8'
  });

  if (result.status !== 0) {
    throw new Error(`CLI failed: ${result.stderr || result.stdout}`);
  }

  return result;
};

describe('create-kiss CLI', () => {
  let tempDir;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'create-kiss-test-'));
  });

  afterEach(() => {
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('copies template files and flattens src directory', () => {
    const projectName = 'test-app';
    runCli(tempDir, projectName);

    const projectDir = path.join(tempDir, projectName);

    expect(fs.existsSync(path.join(projectDir, 'src'))).toBe(true);
    expect(fs.existsSync(path.join(projectDir, 'src', 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(projectDir, 'src', 'src'))).toBe(false);
    expect(fs.existsSync(path.join(projectDir, 'webpack.config.js'))).toBe(true);
  });

  it('normalizes package name inside generated package.json', () => {
    const projectName = 'My Cool App';
    runCli(tempDir, projectName);

    const pkgPath = path.join(tempDir, projectName, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

    expect(pkg.name).toBe('my-cool-app');
  });
});

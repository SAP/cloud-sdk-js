const ARTIFACTORY_TARBALL_PREFIX =
  'https://common.repositories.cloud.sap/artifactory/api/npm/build.releases.npm/';
const PUBLIC_NPM_TARBALL_PREFIX = 'https://registry.npmjs.org/';

let activeDefaultRegistry = PUBLIC_NPM_TARBALL_PREFIX;

function normalizeRegistryUrl(registryUrl) {
  if (!registryUrl) {
    return undefined;
  }

  return registryUrl.endsWith('/') ? registryUrl : `${registryUrl}/`;
}

function isArtifactoryRegistry(registryUrl) {
  return normalizeRegistryUrl(registryUrl)?.startsWith(ARTIFACTORY_TARBALL_PREFIX);
}

function shouldNormalizeTarballs(registryUrls = []) {
  const normalizedRegistryUrls = registryUrls
    .map(normalizeRegistryUrl)
    .filter(Boolean);

  if (normalizedRegistryUrls.length === 0) {
    return !isArtifactoryRegistry(activeDefaultRegistry);
  }

  return !normalizedRegistryUrls.some(isArtifactoryRegistry);
}

function parsePackageId(depPath) {
  const bareDepPath = depPath.replace(/\(.*/, '');
  const versionSeparator = bareDepPath.lastIndexOf('@');

  if (versionSeparator <= 0) {
    return undefined;
  }

  return {
    name: bareDepPath.slice(0, versionSeparator),
    version: bareDepPath.slice(versionSeparator + 1)
  };
}

function toPublicTarballUrl(name, version) {
  const packageBaseName = name.startsWith('@') ? name.split('/')[1] : name;

  return `${PUBLIC_NPM_TARBALL_PREFIX}${name}/-/${packageBaseName}-${version}.tgz`;
}

function normalizePackageSnapshot(depPath, pkgSnapshot, log) {
  const tarball = pkgSnapshot?.resolution?.tarball;

  if (!tarball?.startsWith(ARTIFACTORY_TARBALL_PREFIX)) {
    return false;
  }

  const parsed = parsePackageId(depPath);

  if (!parsed) {
    log(`Skipping tarball normalization for unparseable package id: ${depPath}`);
    return false;
  }

  pkgSnapshot.resolution.tarball = toPublicTarballUrl(parsed.name, parsed.version);
  return true;
}

function normalizeLockfile(lockfile, log) {
  if (!lockfile?.packages) {
    return 0;
  }

  let normalizedCount = 0;

  for (const [depPath, pkgSnapshot] of Object.entries(lockfile.packages)) {
    if (normalizePackageSnapshot(depPath, pkgSnapshot, log)) {
      normalizedCount += 1;
    }
  }

  return normalizedCount;
}

export const hooks = {
  updateConfig(config) {
    activeDefaultRegistry = normalizeRegistryUrl(
      config.registries?.default ?? config.registry
    );

    return config;
  },

  preResolution({ wantedLockfile, currentLockfile, registries }) {
    if (!shouldNormalizeTarballs(Object.values(registries ?? {}))) {
      return;
    }

    normalizeLockfile(wantedLockfile, () => {});
    normalizeLockfile(currentLockfile, () => {});
  },

  afterAllResolved(lockfile, context) {
    const normalizedCount = normalizeLockfile(lockfile, context.log);

    if (normalizedCount > 0) {
      context.log(
        `Normalized ${normalizedCount} Artifactory tarball URL${normalizedCount === 1 ? '' : 's'} to registry.npmjs.org.`
      );
    }

    return lockfile;
  }
};

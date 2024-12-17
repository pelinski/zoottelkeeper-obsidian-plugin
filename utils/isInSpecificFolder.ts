import { ZoottelkeeperPluginSettings } from "../interfaces";

export const isInAllowedFolder = (settings: ZoottelkeeperPluginSettings, indexFilePath: string): boolean => {
  if (!settings.foldersIncluded || settings.foldersIncluded.trim() === "") {
    return true; // Allow everything if no folders are specified
  }
  return isInSpecificFolder(settings, indexFilePath, "foldersIncluded");
};

// export const isInDisAllowedFolder = (settings: ZoottelkeeperPluginSettings, indexFilePath: string): boolean => {
//   return isInSpecificFolder(settings, indexFilePath, "foldersExcluded");
// };

export const isInSpecificFolder = (settings: ZoottelkeeperPluginSettings, indexFilePath: string, folderType: string): boolean => {
  const folderList = settings[folderType]
    .replace(/,/g, "\n")
    .split("\n")
    .map((folder) => folder.trim())
    .filter(Boolean);

  return folderList.some((folder) => {
    if (folder.endsWith("*")) {
      return indexFilePath.startsWith(folder.slice(0, -1)); // Match wildcard folders
    } else {
      const normalizedPath = `${folder}/`;
      return indexFilePath.startsWith(normalizedPath); // Ensure exact folder match
    }
  });
};

export interface User {
  id: number;
  name: string;
  profileUrl: string;
  profileStatus: string;
  milestoneEarned: string;
  skillBadges: number;
  arcadeGames: number;
  triviaGames: number;
  labFreeCourses: number;
  totalProgress: number;
}

export interface LeaderboardProps {
  users: User[];
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

export interface FileUploadProps {
  onFileUpload: (file: File) => void;
} 
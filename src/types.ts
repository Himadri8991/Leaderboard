export interface User {
  id: number;
  user_name: string;
  google_cloud_skills_boost_profile_url: string;
  profile_url_status: string;
  milestone_earned: string;
  '#_of_skill_badges_completed': number;
  '#_of_arcade_games_completed': number;
 '#_of_trivia_games_completed': number;
  '#_of_lab-free_courses_completed': number;
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
import ResourceManager from '../../components/admin/ResourceManager';
import { achievementConfig } from '../../config/resourceConfigs';

export default function AchievementsAdminPage() {
  return <ResourceManager config={achievementConfig} />;
}

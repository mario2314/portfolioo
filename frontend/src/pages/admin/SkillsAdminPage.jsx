import ResourceManager from '../../components/admin/ResourceManager';
import { skillConfig } from '../../config/resourceConfigs';

export default function SkillsAdminPage() {
  return <ResourceManager config={skillConfig} />;
}

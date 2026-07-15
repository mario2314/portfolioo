import ResourceManager from '../../components/admin/ResourceManager';
import { educationConfig } from '../../config/resourceConfigs';

export default function EducationAdminPage() {
  return <ResourceManager config={educationConfig} />;
}

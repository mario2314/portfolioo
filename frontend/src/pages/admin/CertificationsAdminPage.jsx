import ResourceManager from '../../components/admin/ResourceManager';
import { certificationConfig } from '../../config/resourceConfigs';

export default function CertificationsAdminPage() {
  return <ResourceManager config={certificationConfig} />;
}

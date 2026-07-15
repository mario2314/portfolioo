import ResourceManager from '../../components/admin/ResourceManager';
import { blogConfig } from '../../config/resourceConfigs';

export default function BlogAdminPage() {
  return <ResourceManager config={blogConfig} />;
}

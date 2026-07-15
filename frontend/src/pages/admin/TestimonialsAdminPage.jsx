import ResourceManager from '../../components/admin/ResourceManager';
import { testimonialConfig } from '../../config/resourceConfigs';

export default function TestimonialsAdminPage() {
  return <ResourceManager config={testimonialConfig} />;
}

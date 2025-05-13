import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import CreateCertificateForm from "../../components/form/CreateCertificate";
import CreateProjectForm from "../../components/form/CreateProjectForm"; // Yangi componentni import qilish

export default function FormElements() {
  return (
    <div>
      <PageMeta
        title="Project Yaratish | TailAdmin - React.js Admin Dashboard Template"
        description="Yangi project yaratish formasi"
      />
      <PageBreadcrumb pageTitle="Project Yaratish" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          {/* CreateProjectForm componentini chaqirish */}
          <CreateProjectForm />
          <CreateCertificateForm/>
        </div>
      </div>
    </div>
  );
}

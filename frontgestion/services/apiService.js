export const fetchMallas = async () => {
  const response = await fetch("http://localhost:5136/api/malla");
  return await response.json();
};

export const fetchAsignaturas = async (mallaId, semestre) => {
  const response = await fetch(`http://localhost:5136/api/asignatura?malla_id=${mallaId}&semestre=${semestre}`);
  return await response.json();
};

export const uploadDocumento = async (file, malla, asignatura) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("malla", malla);
  formData.append("asignatura", asignatura);

  const response = await fetch("http://localhost:5136/api/pdf/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text(); // para loguear mejor el error real
    throw new Error(`Error al subir el archivo: ${text}`);
  }

  return await response.json();



  if (!response.ok)   {
    const text = await response.text(); // para loguear mejor el error real
    throw new Error(`Error al subir el archivo: ${text}`);
  }

  return await response.json();
};



export const fetchPdfs = async () => {
  const response = await fetch("http://localhost:5136/api/pdf/get-all");
  if (!response.ok) throw new Error("Error al obtener PDFs");
  return await response.json();
};

export const realizarSolicitud = async (
  file,
  requestReason,
  requestedBy,
  malla,
  semestre,
  asignaturaCodigo,
  asignaturaNombre
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("requestReason", requestReason);
  formData.append("requestedBy", requestedBy);
  formData.append("malla", malla);
  formData.append("semestre", semestre);
  formData.append("asignaturaCodigo", asignaturaCodigo);
  formData.append("asignaturaNombre", asignaturaNombre);

  const response = await fetch("http://localhost:5136/api/request/with-document", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al realizar solicitud.");
  }

  return await response.json();
};

export const fetchRequests = async () => {
  const response = await fetch("http://localhost:5136/api/request/all");
  if (!response.ok) throw new Error("No se pudieron obtener las solicitudes.");
  return await response.json();
};

export const approveRequest = async (id) => {
  const response = await fetch(`http://localhost:5136/api/request/${id}/approve`, { method: "PUT" });
  if (!response.ok) throw new Error("Error al aprobar solicitud.");
};

export const rejectRequest = async (id) => {
  const response = await fetch(`http://localhost:5136/api/request/${id}/reject`, { method: "PUT" });
  if (!response.ok) throw new Error("Error al rechazar solicitud.");
};


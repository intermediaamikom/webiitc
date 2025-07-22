import React, { useState, useEffect } from "react";
import GetEvent from "@/api/admin/event/GetEvent";
import CreateAcara from "@/api/admin/event/CreateAcara";
import ActivateEvent from "@/api/admin/event/ActivateEvent";
import UpdateEvent from "@/api/admin/event/UpdateEvent";
import DeleteEvent from "@/api/admin/event/DeleteEvent";
import DashboardAdminTemplate from "@/components/pagetemplate/DashboardAdmin";
import DashboardCard from "@/components/atoms/DashboardCard";
import CardSelect from "@/components/molecules/CardSelect";
import ModalSelectEvent from "@/components/molecules/ModalSelectEvent";
import Alert from "@/components/atoms/Alert";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newEventName, setNewEventName] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [editEventId, setEditEventId] = useState(null);
  const [deleteEventId, setDeleteEventId] = useState(null); // ID event yang ingin dihapus
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      const { events } = await GetEvent();
      setEvents(events || []);
    } catch {
      setError("Failed to load events. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertOpen(true);
    setTimeout(() => setIsAlertOpen(false), 3000);
  };

  const handleCreateEvent = async () => {
    if (!newEventName || !newEventDescription)
      return showAlert("Nama dan Deskripsi acara wajib diisi");

    try {
      const response = await CreateAcara({
        name: newEventName,
        description: newEventDescription,
      });
      if (response.status === 1) {
        showAlert(`${response.message} ${newEventName}`);
        setShowCreateModal(false);
        fetchEvents();
      } else {
        showAlert(`Error: ${response.message || "Gagal membuat event"}`);
      }
    } catch {
      showAlert("Terjadi kesalahan saat membuat event");
    }
  };

  const handleUpdateEvent = async () => {
    try {
      const response = await UpdateEvent({
        id: editEventId,
        name: newEventName,
        description: newEventDescription,
      });
      if (response.status === 1) {
        showAlert(`Event "${newEventName}" telah diperbarui`);
        setShowEditModal(false);
        fetchEvents();
      } else {
        showAlert(`Error: ${response.message || "Gagal memperbarui event"}`);
      }
    } catch {
      showAlert("Terjadi kesalahan saat memperbarui event");
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await DeleteEvent({ id: deleteEventId });
      if (response.status === 1) {
        showAlert("Event telah dihapus");
        setShowDeleteModal(false);
        fetchEvents();
      } else {
        showAlert(`Error: ${response.message || "Gagal menghapus event"}`);
      }
    } catch {
      showAlert("Terjadi kesalahan saat menghapus event");
    }
  };

  const handleActivateEvent = async (id) => {
    try {
      const response = await ActivateEvent({ id });
      console.log("ActivateEvent response:", response);

      if (response?.status === 1) {
        showAlert("Event telah diaktifkan");
        fetchEvents();
      } else {
        showAlert(`Error: ${response?.message || "Gagal mengaktifkan event"}`);
      }
    } catch (error) {
      console.error("Error caught in handleActivateEvent:", error);
      showAlert("Terjadi kesalahan saat mengaktifkan event");
    }
  };

  return (
    <DashboardAdminTemplate title="Events">
      <DashboardCard>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Daftar Acara</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-brown text-white px-4 py-2 rounded"
          >
            Buat Acara
          </button>
        </div>

        {isLoading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : error ? (
          <div className="text-center mt-4 text-red-500">{error}</div>
        ) : events.length > 0 ? (
          <div className="grid gap-4 mt-4">
            {events.map((event) => (
              <CardSelect
                key={event.id}
                id={event.id}
                name={event.name}
                description={event.description}
                onEdit={() => {
                  setEditEventId(event.id);
                  setNewEventName(event.name);
                  setNewEventDescription(event.description);
                  setShowEditModal(true);
                }}
                onDelete={() => {
                  setDeleteEventId(event.id); // Set ID event yang ingin dihapus
                  setShowDeleteModal(true); // Tampilkan modal delete
                }}
                onActivate={() => handleActivateEvent(event.id)}
                isActive={event.is_active === 1}
                onRadioChange={() => handleActivateEvent(event.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center mt-4">Tidak ada acara terdaftar</div>
        )}
      </DashboardCard>

      {showCreateModal && (
        <ModalSelectEvent
          title="Buat Event Baru"
          onClose={() => setShowCreateModal(false)}
          onConfirm={handleCreateEvent}
        >
          <input
            type="text"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            placeholder="Nama Event"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <textarea
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
            placeholder="Deskripsi Event"
            className="w-full border px-3 py-2 rounded mt-2"
            required
          />
        </ModalSelectEvent>
      )}

      {showEditModal && (
        <ModalSelectEvent
          title="Edit Event"
          onClose={() => setShowEditModal(false)}
          onConfirm={handleUpdateEvent}
        >
          <input
            type="text"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            placeholder="Nama Event"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <textarea
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
            placeholder="Deskripsi Event"
            className="w-full border px-3 py-2 rounded mt-2"
            required
          />
        </ModalSelectEvent>
      )}

      {showDeleteModal && (
        <ModalSelectEvent
          title="Konfirmasi Hapus Event"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteEvent}
        >
          <p>Apakah Anda yakin ingin menghapus event ini?</p>
        </ModalSelectEvent>
      )}

      <Alert isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
        <span>{alertMessage}</span>
      </Alert>
    </DashboardAdminTemplate>
  );
};

export default Event;

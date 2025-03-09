import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CheckCircleOutline, Delete } from "@mui/icons-material";
import ConfirmModal from "../components/ConfirmModal";
import { useAuth } from "../store/auth";

export default function Payments() {
  const [payments, setpayments] = useState([]);
  const { authorizationToken } = useAuth();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const openConfirmModal = (id) => {
    setIsConfirmModalOpen(true);
    setSelectedPaymentId(id);
  };

  const closeConfirmModal = () => {
    setSelectedPaymentId(null);
    setIsConfirmModalOpen(false);
  };
  const confirmDelete = async () => {
    if (selectedPaymentId) {
      await deletePayment(selectedPaymentId);
    }
    closeConfirmModal();
  };
  const deletePayment = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/payments/${id}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.ok) {
        toast.success("Payment deleted successfully.");
        fetchpayments();
      } else {
        toast.error("Error while deleting payment.");
      }
    } catch (e) {
      toast.error(e);
    }
  };
  const fetchpayments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/payments", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      // console.log(res_data);
      if (response.ok) {
        setpayments(res_data);
      } else {
        toast.error("Error while loading payments.");
      }
    } catch (e) {
      toast.error(e);
    }
  };
  useEffect(() => {
    fetchpayments();
  }, []);

  // const pendingPayments = payments.filter(
  //   (payment) => payment.paymentStatus === "pending"
  // );
  const pendingPayments = payments.filter(
    (payment) => payment.registeredUser?.paymentStatus === "pending"
  );

  const sendMail = async (id) => {
    console.log("Email Person id: ", id);
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/send-mail`,
        {
          method: "POST",
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailPerson: id }),
        }
      );
      const res_data = await response.json();
      if (response.ok) {
        console.log("Email sent successfully!", res_data);
      } else {
        console.error("Error while sending mail.");
      }
    } catch (e) {
      console.error(e, "Error while sending mail.");
    }
  };

  const updatePaymentStatus = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/payments/${id}/update`,
        {
          method: "PATCH",
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentStatus: "paid" }),
        }
      );
      // const res_data = await response.json();
      if (response.ok) {
        // console.log("Updated registration: ", res_data);
        fetchpayments();
        toast.success("Payment status updated!");
        sendMail(id);
      } else {
        console.error("Error while updating payment status.");
      }
    } catch (e) {
      console.error(e);
      console.error("Error while updating payment status", e);
    }
  };

  return (
    <section className="admin-payments">
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        isClose={closeConfirmModal}
        onConfirm={confirmDelete}
      />
      <h2>PAYMENTS</h2>
      <div className="all-payments">
        {pendingPayments.length > 0 ? (
          pendingPayments.map((payment) => {
            const { _id, imageUrl } = payment;
            return (
              <div className="payment" key={_id}>
                <div className="payment-body">
                  <img src={imageUrl} alt="Payment Screenshot" />
                </div>
                <div className="payment-footer">
                  <button
                    className="del-btn op-btns"
                    onClick={() => openConfirmModal(_id)}
                  >
                    <Delete className="op-icon" />
                    Delete
                  </button>
                  <button
                    className="approve-btn op-btns"
                    onClick={() => updatePaymentStatus(_id)}
                  >
                    Approve
                    <CheckCircleOutline className="check-icon" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No payments Found.</p>
        )}
      </div>
    </section>
  );
}

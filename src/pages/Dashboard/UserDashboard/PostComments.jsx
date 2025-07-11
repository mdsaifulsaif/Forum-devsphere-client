import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Modal from "react-modal";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import LoadingPage from "../../../Components/LoadingPage";

const feedbackOptions = [
  "Inappropriate Language",
  "Spam or Irrelevant",
  "Harassment or Abuse",
];

const PostComments = () => {
  const { postId } = useParams();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  // Load comments
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${postId}`);
      return res.data;
    },
  });

  // Handle Report
  const reportMutation = useMutation({
    mutationFn: async ({ commentId, feedback }) => {
      return await axiosSecure.patch(`/comments/report/${commentId}`, {
        feedback,
      });
    },
    onSuccess: () => {
      Swal.fire("Reported", "The comment has been reported.", "success");
      queryClient.invalidateQueries(["comments", postId]);
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong!", "error");
    },
  });

  const handleReport = (commentId) => {
    reportMutation.mutate({
      commentId,
      feedback: selectedFeedback[commentId],
    });
  };

  const openModal = (text) => {
    setModalText(text);
    setShowModal(true);
  };

  if (comments.length == 0) {
    return (
      <p className="text-gray-400 text-3xl text-center py-5">
        No comment in this post{" "}
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold text-[#129990] mb-4">All Comments</h2>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border text-sm">
            <thead>
              <tr className="bg-[#129990]/10 text-left">
                <th className="p-3">Email</th>
                <th className="p-3">Comment</th>
                <th className="p-3">Feedback</th>
                <th className="p-3">Report</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((c) => (
                <tr key={c._id} className="border-t">
                  <td className="p-3">{c.commenterEmail}</td>
                  <td className="p-3">
                    {c.comment.length > 20 ? (
                      <>
                        {c.comment.slice(0, 20)}...
                        <button
                          className="text-[#129990] ml-1 underline"
                          onClick={() => openModal(c.comment)}
                        >
                          Read More
                        </button>
                      </>
                    ) : (
                      c.comment
                    )}
                  </td>
                  <td className="p-3">
                    <select
                      className="border rounded px-2 py-1"
                      value={selectedFeedback[c._id] || ""}
                      onChange={(e) =>
                        setSelectedFeedback((prev) => ({
                          ...prev,
                          [c._id]: e.target.value,
                        }))
                      }
                      disabled={c.reported}
                    >
                      <option value="">Select feedback</option>
                      {feedbackOptions.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleReport(c._id)}
                      disabled={c.reported || !selectedFeedback[c._id]}
                      className={`px-3 py-1 rounded text-white ${
                        c.reported
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#129990] hover:bg-[#0e7f7f]"
                      }`}
                    >
                      {c.reported ? "Reported" : "Report"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Read More Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Full Comment"
        className="bg-white p-6 max-w-lg mx-auto mt-20 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40"
      >
        <h3 className="text-xl font-bold text-[#129990] mb-2">Full Comment</h3>
        <p className="text-gray-700">{modalText}</p>
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 px-4 py-2 bg-[#129990] text-white rounded hover:bg-[#0e7f7f]"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default PostComments;

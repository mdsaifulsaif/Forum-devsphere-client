import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const ReportedComments = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch reported comments
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reportedComments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/reported-comments");
      return res.data;
    },
  });

  // Mutation: mark as resolved
  const resolveMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/admin/resolve-report/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Resolved", "Report marked as resolved", "success");
      queryClient.invalidateQueries(["reportedComments"]);
    },
  });

  // Mutation: delete comment
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/admin/delete-comment/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted", "Comment has been deleted", "success");
      queryClient.invalidateQueries(["reportedComments"]);
    },
  });

  const handleResolve = (id) => resolveMutation.mutate(id);
  const handleDelete = (id) =>
    Swal.fire({
      title: "Are you sure?",
      text: "This comment will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#129990",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-[#129990] mb-4">
        Reported Comments
      </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-500">No reports found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border text-sm table-auto">
            <thead className="bg-[#129990]/10">
              <tr>
                <th className="p-3 text-left min-w-[150px] w-2/5">Comment</th>
                <th className="p-3 text-left min-w-[120px]">Email</th>
                <th className="p-3 text-left min-w-[100px]">Feedback</th>
                <th className="p-3 text-left min-w-[80px]">Status</th>
                <th className="p-3 text-left min-w-[140px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id} className="border-t">
                  <td className="p-3 break-words max-w-[300px] text-gray-800">
                    {report.comment.length > 50 ? (
                      <span title={report.comment}>
                        {report.comment.slice(0, 50)}...
                      </span>
                    ) : (
                      report.comment
                    )}
                  </td>
                  <td className="p-3 break-all">{report.commenterEmail}</td>
                  <td className="p-3">{report.feedback}</td>
                  <td className="p-3 capitalize">
                    {report.reportStatus || "pending"}
                  </td>
                  <td className="p-3 flex flex-wrap gap-2">
                    {report.reportStatus !== "resolved" && (
                      <button
                        onClick={() => handleResolve(report._id)}
                        className="px-3 py-1 rounded text-white bg-[#129990] hover:bg-[#0e7f7f]"
                      >
                        Resolve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(report._id)}
                      className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportedComments;

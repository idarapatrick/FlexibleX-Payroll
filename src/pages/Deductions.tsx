import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface Deduction {
  id: string;
  name: string;
  type: "fixed" | "percentage";
  value: number;
  description: string;
}

type NewDeduction = Omit<Deduction, "id" | "createdAt">;

export default function Deductions() {
  const [deductions, setDeductions] = useState<Deduction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDeduction, setNewDeduction] = useState<NewDeduction>({
    name: "",
    type: "fixed" as const,
    value: 0,
    description: "",
  });

  useEffect(() => {
    fetchDeductions();
  }, []);

  const fetchDeductions = async () => {
    if (!auth.currentUser) return;
    try {
      const querySnapshot = await getDocs(
        collection(db, `companies/${auth.currentUser.uid}/deductions`)
      );
      const deductionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Deduction[];
      setDeductions(deductionsData);
    } catch (error) {
      toast.error("Failed to fetch deductions");
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast.error("Please sign in first");
      return;
    }

    try {
      await addDoc(
        collection(db, `companies/${auth.currentUser.uid}/deductions`),
        {
          ...newDeduction,
          createdAt: new Date().toISOString(),
        }
      );

      setIsModalOpen(false);
      setNewDeduction({ name: "", type: "fixed", value: 0, description: "" });
      toast.success("Deduction added successfully");
      fetchDeductions();
    } catch (error) {
      toast.error("Failed to add deduction");
      console.error(error);
    }
  };

  const deleteDeduction = async (id: string) => {
    if (!auth.currentUser) return;
    try {
      await deleteDoc(
        doc(db, `companies/${auth.currentUser.uid}/deductions/${id}`)
      );
      toast.success("Deduction deleted successfully");
      fetchDeductions();
    } catch (error) {
      toast.error("Failed to delete deduction");
      console.error(error);
    }
  };

  return (
    <div className="flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Deductions Management
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Deduction
            </button>
          </div>

          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deductions.map((deduction) => (
                  <tr key={deduction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {deduction.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {deduction.type === "fixed"
                        ? "Fixed Amount"
                        : "Percentage"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {deduction.type === "fixed"
                        ? `$${deduction.value}`
                        : `${deduction.value}%`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {deduction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => deleteDeduction(deduction.id)}
                        className="text-red-600 hover:text-red-900 ml-4"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Deduction"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deduction Name
              </label>
              <input
                type="text"
                required
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={newDeduction.name}
                onChange={(e) =>
                  setNewDeduction({ ...newDeduction, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={newDeduction.type}
                onChange={(e) =>
                  setNewDeduction({
                    ...newDeduction,
                    type: e.target.value as "fixed" | "percentage",
                  })
                }
              >
                <option value="fixed">Fixed Amount</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {newDeduction.type === "fixed" ? "Amount" : "Percentage"}
              </label>
              <input
                type="number"
                required
                step={newDeduction.type === "percentage" ? "0.01" : "1"}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={newDeduction.value}
                onChange={(e) =>
                  setNewDeduction({
                    ...newDeduction,
                    value: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={newDeduction.description}
                onChange={(e) =>
                  setNewDeduction({
                    ...newDeduction,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save Deduction
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

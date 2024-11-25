import { format } from "date-fns";
import { Payment } from "../types";

interface PaymentSlipProps {
  payment: Payment;
  payrollPeriod: {
    title: string;
    startDate: string;
    endDate: string;
  };
}

export default function PaymentSlip({
  payment,
  payrollPeriod,
}: PaymentSlipProps) {
  return (
    <div className="bg-white p-6 space-y-6">
      <div className="text-center border-b pb-4">
        <h3 className="text-lg font-bold">Payment Slip</h3>
        <p className="text-sm text-gray-500">{payrollPeriod.title}</p>
        <p className="text-sm text-gray-500">
          {format(new Date(payrollPeriod.startDate), "MMMM d, yyyy")} -{" "}
          {format(new Date(payrollPeriod.endDate), "MMMM d, yyyy")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-medium text-gray-700">Employee Information</h4>
          <div className="mt-2 space-y-1">
            <p>
              <span className="text-gray-500">Name:</span>{" "}
              {payment.employee.firstName} {payment.employee.lastName}
            </p>
            <p>
              <span className="text-gray-500">Position:</span>{" "}
              {payment.employee.position}
            </p>
            <p>
              <span className="text-gray-500">Department:</span>{" "}
              {payment.employee.department}
            </p>
            <p>
              <span className="text-gray-500">Payment Rate:</span>{" "}
              {payment.employee.paymentRate === "monthly"
                ? "Monthly"
                : "Hourly"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Earnings</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Base Salary</span>
              <span>{payment.baseSalary.toLocaleString()} RWF</span>
            </div>
            {payment.benefits.map((benefit, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-500">{benefit.name}</span>
                <span className="text-green-600">
                  +{benefit.amount.toLocaleString()} RWF
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">Deductions</h4>
          <div className="space-y-2">
            {payment.deductions.map((deduction, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-500">{deduction.name}</span>
                <span className="text-red-600">
                  -{deduction.amount.toLocaleString()} RWF
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Total Benefits</span>
              <span className="text-green-600">
                +{payment.totalBenefits.toLocaleString()} RWF
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Total Deductions</span>
              <span className="text-red-600">
                -{payment.totalDeductions.toLocaleString()} RWF
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Net Pay</span>
              <span>{payment.netPay.toLocaleString()} RWF</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center pt-4 border-t">
        This is a computer-generated document and does not require a signature.
      </div>
    </div>
  );
}

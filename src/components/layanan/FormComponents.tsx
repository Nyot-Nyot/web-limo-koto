import React, { memo, useCallback } from "react";

interface FormFieldProps {
	label: string;
	name: string;
	type?: "text" | "select";
	value: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void;
	required?: boolean;
	options?: string[];
	placeholder?: string;
}

const FormField = memo<FormFieldProps>(
	({
		label,
		name,
		type = "text",
		value,
		onChange,
		required = false,
		options,
		placeholder,
	}) => (
		<div>
			<label
				htmlFor={name}
				className="block text-gray-700 text-sm font-semibold mb-1"
			>
				{label} {required && <span className="text-red-500">*</span>}
			</label>
			{type === "select" ? (
				<select
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					className="w-full rounded border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					required={required}
				>
					<option value="">Pilih {label}</option>
					{options?.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			) : (
				<input
					type={type}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className="w-full rounded border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					required={required}
				/>
			)}
		</div>
	)
);

FormField.displayName = "FormField";

interface FileUploadProps {
	label: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	accept?: string;
}

const FileUpload = memo<FileUploadProps>(
	({
		label,
		onChange,
		required = false,
		accept = "image/*,application/pdf",
	}) => (
		<div>
			<label className="block text-gray-700 text-sm font-semibold mb-1">
				{label} {required && <span className="text-red-500">*</span>}
			</label>
			<input
				type="file"
				accept={accept}
				onChange={onChange}
				className="block w-full text-gray-900 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
				required={required}
			/>
		</div>
	)
);

FileUpload.displayName = "FileUpload";

interface BaseFormProps {
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

const BaseForm = memo<BaseFormProps>(({ onClose, title, children }) => {
	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			alert(`Pengajuan ${title} berhasil dikirim!`);
			onClose();
		},
		[onClose, title]
	);

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{children}
			<div className="flex justify-end pt-4 border-t">
				<button
					type="submit"
					className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
				>
					Kirim Permohonan
				</button>
			</div>
		</form>
	);
});

BaseForm.displayName = "BaseForm";

export { FormField, FileUpload, BaseForm };

import React from "react";

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
          aria-label="閉じる"
        >
          ×
        </button>
        <h1 className="text-xl font-bold mb-4">利用規約</h1>
        <div className="text-xs text-gray-700 space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          <p>
            この利用規約（以下「本規約」といいます）は、TOFU NOTE（以下「本サービス」といいます）の利用条件を定めるものです。ユーザーの皆さまには、本規約に同意いただいた上で本サービスをご利用いただきます。
          </p>

          <h2 className="font-semibold mt-4">第1条（適用）</h2>
          <p>
            本規約は、ユーザーと運営者との間の本サービスの利用に関わる一切の関係に適用されます。
          </p>

          <h2 className="font-semibold mt-4">第2条（サービス内容）</h2>
          <p>
            本サービスは、ユーザーが日記等の記録を行い、メンタルスコア等を管理・分析できるサービスです。サービス内容は予告なく変更される場合があります。
          </p>

          <h2 className="font-semibold mt-4">第3条（禁止事項）</h2>
          <ul className="list-disc ml-5">
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>他のユーザーまたは第三者の権利を侵害する行為</li>
            <li>虚偽の情報を登録する行為</li>
            <li>スパム行為</li>
            <li>クローリング、スクレイピング、またはボット等を用いた本サービスへのアクセス</li>
            <li>その他運営者が不適切と判断する行為</li>
          </ul>

          <h2 className="font-semibold mt-4">第4条（知的財産権）</h2>
          <p>
            本サービスに関する著作権、商標権その他の知的財産権は、運営者または正当な権利を有する第三者に帰属します。ユーザーは、運営者の許可なくこれらを利用してはなりません。
          </p>

          <h2 className="font-semibold mt-4">第5条（サービスの変更・中断・終了）</h2>
          <p>
            運営者は、ユーザーへの事前通知なく、本サービスの内容を変更・追加・中断・終了することができます。これによりユーザーに生じた損害について、運営者は一切の責任を負いません。
          </p>

          <h2 className="font-semibold mt-4">第6条（免責事項）</h2>
          <p>
            本サービスの利用により生じたあらゆる損害について、運営者は一切の責任を負いません。<br/>
            また、本サービスはベータ版として提供されており、予告なくユーザーのデータを削除または消失させる場合があります。これにより生じた損害についても、運営者は一切の責任を負いません。
          </p>

          <h2 className="font-semibold mt-4">第7条（プライバシー・個人情報の取扱い・外部連携）</h2>
          <p>
            本サービスは、ユーザーが入力した日記等のプライベートな情報を適切に管理し、第三者に開示・提供しません。ただし、法令に基づく場合や、サービス運営上必要な範囲で利用する場合を除きます。<br/>
            入力された日記データやメンタルスコア等を、自然言語処理やメンタル傾向分析の目的で、OpenAI等の外部APIに送信することがあります。
          </p>

          <h2 className="font-semibold mt-4">第8条（利用者の責任）</h2>
          <p>
            ユーザーは自己の責任において本サービスを利用するものとし、登録情報の管理や入力内容について一切の責任を負うものとします。
          </p>

          <h2 className="font-semibold mt-4">第9条（規約の変更）</h2>
          <p>
            運営者は、必要と判断した場合には、ユーザーに通知することなく本規約を変更できるものとします。変更後の規約は、本サービス上に表示した時点から効力を生じます。
          </p>

          <h2 className="font-semibold mt-4">第10条（準拠法・裁判管轄）</h2>
          <p>
            本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、運営者の所在地を管轄する裁判所を専属的合意管轄とします。
          </p>

          <p className="mt-6 text-gray-400">2025年7月10日 制定</p>
        </div>
      </div>
    </div>
  );
}; 